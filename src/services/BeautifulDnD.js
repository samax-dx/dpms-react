import { atom } from "recoil";


export const dndDragEndDetailState = atom({
    key: "dndDragEndResultState",
    default: { result: {}, provided: {} }
});
