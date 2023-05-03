import axios from "axios";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { createDataQueryHook } from "@Lib/RecoilUtil";
import { useState } from "react";


const base_url = "http://localhost:18082/Batch";

const batchListState = atom({
    key: "batchListState",
    default: { data: null, version: 0 }
});

const batchSaveState = atom({
    key: "batchSaveState",
    default: { loading: false, complete: false, data: null }
});

export const useBatchList = createDataQueryHook(
    "batch",
    async (filter) => {
        const response = await axios.get(`${base_url}/listBatches?filter=${filter}`);
        return response.data;
    },
    batchListState
);

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

export const useDeleteBatch = () => {
    const setBatchList = useSetRecoilState(batchListState);

    return async (batchId) => {
        const response = await axios.post(`${base_url}/createBatch`, batchId);
        setBatchList(({ version }) => ({ version: version + 1 }));
        return response.data;
    };
};
