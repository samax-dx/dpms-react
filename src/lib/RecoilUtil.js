import { useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";


/*
export const createDataQueryHook = (hookName, fetcher, respSyncState) => {
    const queryFilterState = atom({
        key: `${hookName}QueryFilterState`,
        default: null
    });

    const queryResponseState = atom({
        key: `${hookName}QueryResponseState`,
        default: selector({
            get: async ({ get }) => {
                const filter = get(queryFilterState);

                if (filter === null) {
                    throw Error("no_query");
                }

                return await fetcher(filter);
            }
        })
    });

        return() => {
    const setQueryFilter = useSetRecoilState(queryFilterState);
    const queryResponse = useRecoilValueLoadable(queryResponseState);
    const [respSync, setRespSyncState] = useRecoilState(respSyncState);

    useEffect(() => setRespSyncState(queryResponse), [queryResponse]);

    return [respSync === null ? queryResponse : respSync, filter => setQueryFilter(filter)];
};
};

export const useCreateBatch = () => {
    const [batchList, setBatchList] = useRecoilState(batchListState);

    return async (batchData) => {
        const response = await axios.post(`${base_url}/createBatch`, batchData);
        setBatchList([...batchList, response.data]);
    };
};

export const useUpdateBatch = () => {
    const [batchList, setBatchList] = useRecoilState(batchListState);

    return async (batchData) => {
        const response = await axios.post(`${base_url}/createBatch`, batchData);
        setBatchList(batchList.map(batch => batch.batchId === batchData.batchId ? response.data : batch));
    };
};

export const useDeleteBatch = () => {
    const [batchList, setBatchList] = useRecoilState(batchListState);

    return async (batchId) => {
        const response = await axios.post(`${base_url}/createBatch`, batchId);
        response.data.includes(batchId) && setBatchList(batchList => batchList.filter(batch => batch.batchId !== batchId));
    };
};
*/

export const createDataQueryHook = (hookName, fetcher, respSyncState) => {
    const queryFilterState = atom({
        key: `${hookName}QueryFilterState`,
        default: null
    });

    const queryResponseState = selector({
        key: `${hookName}QueryResponseState`,
        get: async ({ get }) => {
            const filter = get(queryFilterState);

            if (filter === null) {
                throw Error("no_query");
            }

            get(respSyncState);
            return await fetcher(filter);
        }
    });

    return () => {
        const setQueryFilter = useSetRecoilState(queryFilterState);
        const queryResponse = useRecoilValueLoadable(queryResponseState);

        return [queryResponse, filter => setQueryFilter(filter)];
    };
};
