import axios from "axios";
import { atom, selector, useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { createDataQueryHook } from "@Lib/RecoilUtil";


const base_url = "http://localhost:18082/Batch";

const batchListState = atom({
    key: "batchListState",
    default: { data: null, version: 0 }
});

const batchSaveState = atom({
    key: "batchSaveState",
    default: { loading: false, complete: false, data: null }
});

const queryFilterState = atom({
    key: "QueryFilterState",
    default: null
});

const fetcher = async (filter) => {
    const response = await axios.get(`${base_url}/listBatches?filter=${filter}`);
    return response.data;
};

const batchListStateX = atom({
    key: "batchListStateX",
    default: selector({
        key: "batchListStateSelectorX",
        get: async ({ get }) => {
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

            const queryResponse = await fetcher(filter);
            console.log(queryResponse);
            return queryResponse;
        }
    })
});

/*
export const useBatchList = createDataQueryHook(
    "batch",
    async (filter) => {
        const response = await axios.get(`${base_url}/listBatches?filter=${filter}`);
        return response.data;
    },
    batchListState
);
*/
export const useBatchList = () => {
    const batchListLoadable = useRecoilValueLoadable(batchListStateX);
    const setQueryFilter = useSetRecoilState(queryFilterState);

    return [
        batchListLoadable, filter => setQueryFilter(filter)
    ];
};

export const useCreateBatch = () => {
    const setBatchList = useSetRecoilState(batchListState);

    return async (batchData) => {
        const response = await axios.post(`${base_url}/createBatch`, batchData);
        setBatchList(({ version }) => ({ version: version + 1 }));
        return response.data;
    };
};

export const useUpdateBatch = () => {
    const setBatchList = useSetRecoilState(batchListState);

    return async (batchData) => {
        const response = await axios.post(`${base_url}/createBatch`, batchData);
        setBatchList(({ version }) => ({ version: version + 1 }));
        return response.data;
    };
};

/*
export const useSaveBatch = () => {
    const [saveState, setSaveState] = useRecoilState(batchSaveState);
    const syncBatchList = useSetRecoilState(batchListState);

    return [saveState, async (batchData) => {
        setSaveState({ loading: true, complete: false, data: batchData });
        const response = await axios.post(`${base_url}/createBatch`, batchData);
        setSaveState({ loading: false, complete: true, data: response.data });

        setTimeout(() => {
            setSaveState({ loading: false, complete: false, data: null });
            syncBatchList(({ version }) => ({ version: version + 1 }));
        }, 0);

        return response.data;
    }];
};
*/
export const useSaveBatch = () => {
    const [saveState, setSaveState] = useRecoilState(batchSaveState);
    // const syncBatchList = useSetRecoilState(batchListState);

    return [saveState, async (batchData) => {
        setSaveState({ loading: true, complete: false, data: batchData });
        const response = await axios.post(`${base_url}/createBatch`, batchData);
        setSaveState({ loading: false, complete: true, data: response.data });

        setTimeout(() => {
            setSaveState({ loading: false, complete: false, data: null });
            // syncBatchList(({ version }) => ({ version: version + 1 }));
        }, 0);

        return response.data;
    }];
};

export const useDeleteBatch = () => {
    const setBatchList = useSetRecoilState(batchListState);

    return async (batchId) => {
        const response = await axios.post(`${base_url}/createBatch`, batchId);
        setBatchList(({ version }) => ({ version: version + 1 }));
        return response.data;
    };
};
