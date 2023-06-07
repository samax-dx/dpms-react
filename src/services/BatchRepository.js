import axios from "axios";
import { atom, selector, useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { createDataQueryHook } from "@Lib/RecoilUtil";


const base_url = `http://${window.location.hostname}:18082/Batch`;

const fetcher = async (endpoint, filter) => {
    const response = await axios.get(`${base_url}/${endpoint}?${filter}`);
    return response.data;
};


const lastWriteState = atom({
    key: "batchLastWriteState",
    default: { time: null }
});


const batchSaveState = atom({
    key: "batchSaveState",
    default: { loading: false, complete: false, data: null }
});

const queryFilterState = atom({
    key: "QueryFilterState",
    default: null
});

const batchListState = atom({
    key: "batchListState",
    default: selector({
        key: "batchListStateSelector",
        get: async ({ get }) => {
            get(lastWriteState);

            const filter = get(queryFilterState);

            if (filter === null) {
                throw Error("no_query");
            }

            const saveResult = get(batchSaveState);

            if (saveResult.loading) {
                throw Error("updating");
            }

            if (saveResult.data instanceof Error) {
                throw Error("no_updates");
            }

            const queryResponse = await fetcher("/getBatches", "isPublished=false&" + filter);
            return queryResponse;
        }
    })
});

/*
const batchListState = atom({
    key: "batchListState",
    default: { data: null, version: 0 }
});

export const useBatchList = createDataQueryHook(
    "batch",
    async (filter) => {
        const response = await axios.get(`${base_url}/getBatches?filter=${filter}`);
        return response.data;
    },
    batchListState
);

export const useSaveBatch = () => {
    const setBatchList = useSetRecoilState(batchListState);

    return async (batchData) => {
        const response = await axios.post(`${base_url}/saveBatch`, batchData);
        setBatchList(({ version }) => ({ version: version + 1 }));
        return response.data;
    };
};

export const useSaveBatch = () => {
    const [saveState, setSaveState] = useRecoilState(batchSaveState);
    const syncBatchList = useSetRecoilState(batchListState);

    return [saveState, async (batchData) => {
        setSaveState({ loading: true, complete: false, data: batchData });
        const response = await axios.post(`${base_url}/saveBatch`, batchData);
        setSaveState({ loading: false, complete: true, data: response.data });

        setTimeout(() => {
            setSaveState({ loading: false, complete: false, data: null });
            syncBatchList(({ version }) => ({ version: version + 1 }));
        }, 0);

        return response.data;
    }];
};

export const useUpdateBatch = () => {
    const setBatchList = useSetRecoilState(batchListState);

    return async (batchData) => {
        const response = await axios.post(`${base_url}/saveBatch`, batchData);
        setBatchList(({ version }) => ({ version: version + 1 }));
        return response.data;
    };
};

export const useDeleteBatch = () => {
    const setBatchList = useSetRecoilState(batchListState);

    return async (batchId) => {
        const response = await axios.post(`${base_url}/saveBatch`, batchId);
        setBatchList(({ version }) => ({ version: version + 1 }));
        return response.data;
    };
};
*/
export const useBatchList = () => {
    const batchListLoadable = useRecoilValueLoadable(batchListState);
    const setQueryFilter = useSetRecoilState(queryFilterState);

    return [batchListLoadable, setQueryFilter];
};

export const useSaveBatch = () => {
    const [saveState, setSaveState] = useRecoilState(batchSaveState);
    const setLastWriteState = useSetRecoilState(lastWriteState);

    return [saveState, async (batchData) => {
        setSaveState({ loading: true, complete: false, data: batchData });
        const response = await axios.post(`${base_url}/saveBatch`, batchData);
        setSaveState({ loading: false, complete: true, data: response.data });

        setTimeout(() => {
            setSaveState({ loading: false, complete: false, data: null });
            setLastWriteState({ time: Date.now() });
        }, 0);

        return response.data;
    }];
};


const batchPublishState = atom({
    key: "batchPublishState",
    default: { loading: false, complete: false, data: null }
});

const publishedBatchListStateFilter = atom({
    key: "publishedBatchListStateFilter",
    default: null
});

const publishedBatchListState = atom({
    key: "publishedBatchListState",
    default: selector({
        key: "publishedBatchListStateSelector",
        get: async ({ get }) => {
            get(lastWriteState);

            const filter = get(publishedBatchListStateFilter);

            if (filter === null) {
                throw Error("no_query");
            }

            const publishResult = get(batchPublishState);

            if (publishResult.loading) {
                throw Error("updating");
            }

            if (publishResult.data instanceof Error) {
                throw Error("no_updates");
            }

            const queryResponse = await fetcher("/getBatches", "isPublished=true&" + filter);
            return queryResponse;
        }
    })
});

export const usePublishedBatchList = () => {
    const batchListLoadable = useRecoilValueLoadable(publishedBatchListState);
    const setQueryFilter = useSetRecoilState(publishedBatchListStateFilter);

    return [batchListLoadable, setQueryFilter];
};

export const usePublishBatch = () => {
    const [saveState, setSaveState] = useRecoilState(batchPublishState);
    const setLastWriteState = useSetRecoilState(lastWriteState);

    return [saveState, async (publishData) => {
        setSaveState({ loading: true, complete: false, data: publishData });
        const response = await axios.post(`${base_url}/publishBatches`, publishData);
        setSaveState({ loading: false, complete: true, data: response.data });

        setTimeout(() => {
            setSaveState({ loading: false, complete: false, data: null });
            setLastWriteState({ time: Date.now() });
        }, 0);

        return response.data;
    }];
};
