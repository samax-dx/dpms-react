import axios from "axios";
import { atom, selector, useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";


const base_url = `http://${window.location.hostname}:18082/Machine`;

const fetcher = async (endpoint, filter) => {
    const response = await axios.get(`${base_url}/${endpoint}?${filter}`);
    return response.data;
};


const lastWriteState = atom({
    key: "machineLastWriteState",
    default: { time: null }
});


const machineSaveState = atom({
    key: "machineSaveState",
    default: { loading: false, complete: false, data: null }
});

const machineListFilterState = atom({
    key: "machineListFilterState",
    default: null
});

const machineListState = atom({
    key: "machineListState",
    default: selector({
        key: "machineListStateSelector",
        get: async ({ get }) => {
            get(lastWriteState);

            const filter = get(machineListFilterState);

            if (filter === null) {
                throw Error("no_query");
            }

            const saveResult = get(machineSaveState);

            if (saveResult.loading) {
                throw Error("updating");
            }

            if (saveResult.data instanceof Error) {
                throw Error("no_updates");
            }

            const queryResponse = await fetcher("/getMachines", "isPublished=false&" + filter);
            return queryResponse;
        }
    })
});

export const useMachineList = () => {
    const loadableList = useRecoilValueLoadable(machineListState);
    const setListFilter = useSetRecoilState(machineListFilterState);

    return [loadableList, setListFilter];
};
