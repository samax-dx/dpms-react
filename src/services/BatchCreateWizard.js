import { atom, useRecoilState, useRecoilValue } from "recoil";


const STATES = {
    idle: false,
    editBatch: false,
    doneEditBatch: false,
    editProcess: false,
    doneEditProcess: false
};

const CONTEXT = {
    batchData: {},
    processList: [],
    editIndex: -1
};

/**
 * @typedef {typeof STATES} plan_stateval_t
 */

/**
 * @typedef {typeof CONTEXT} plan_contextval_t
 */

/**
 * @typedef {{
 * value: plan_stateval_t,
 * context: plan_contextval_t
 * }} plan_state_t
 */


/**
 * @param {plan_stateval_t} value 
 * @param {plan_contextval_t} context 
 * @returns {plan_state_t} 
 */
function newState(value = { idle: true }, context = {}) {
    return { value: { ...STATES, ...value }, context: { ...CONTEXT, ...context } };
}

const batchPlanState = atom({
    key: "batchPlanState",
    default: newState()
});

export const useBatchCreateWizardState = () => useRecoilValue(batchPlanState);

export const useBatchCreateWizardConditions = () => {
    const planState = useRecoilValue(batchPlanState);
    return {
        canOpenEditBatch: () => planState.value.doneEditBatch || planState.value.doneEditProcess || planState.value.editBatch || planState.value.idle,
        canFinishEditBatch: () => planState.value.editBatch,
        hasFinishedEditBatch: () => planState.value.doneEditBatch || planState.value.doneEditProcess,
        canOpenEditProcess: () => planState.value.doneEditBatch || planState.value.doneEditProcess || planState.value.editProcess,
        canFinishEditProcess: () => planState.value.editProcess,
        hasFinishedEditProcess: () => planState.value.doneEditProcess,
        canFinishEdit: () => planState.value.doneEditBatch || planState.value.doneEditProcess
    };
};

export const useBatchCreateWizardActions = () => {
    const [planState, setPlanState] = useRecoilState(batchPlanState);

    const {
        canOpenEditBatch, canFinishEditBatch, hasFinishedEditBatch,
        canOpenEditProcess, canFinishEditProcess, hasFinishedEditProcess,
        canFinishEdit
    } = useBatchCreateWizardConditions();

    return {
        openEditBatch: batchData => {
            canOpenEditBatch() && setPlanState(newState({ editBatch: true }, { ...planState.context, batchData }));
        },
        finishEditBatch: batchData => {
            canFinishEditBatch() && setPlanState(newState({ doneEditBatch: true }, { ...planState.context, batchData }));
        },
        openEditProcess: (processData, editIndex) => {
            const processList = [...planState.context.processList];
            processList[editIndex] = { ...processData };

            canOpenEditProcess() && setPlanState(newState({ editProcess: true }, { ...planState.context, processList, editIndex }));
        },
        finishEditProcess: (processData) => {
            const editIndex = planState.context.editIndex;
            const processList = [...planState.context.processList];
            processList[editIndex] = { ...processData };

            canFinishEditProcess() && setPlanState(newState({ doneEditProcess: true }, { ...planState.context, processList, editIndex: -1 }));
        },
        finishEdit: () => {
            canFinishEdit() && setPlanState(newState());
        },
        restoreBatchState: (batchData, processList) => {
            setPlanState(newState({ idle: !batchData.batchId, doneEditBatch: !!batchData.batchId, doneEditProcess: processList.length > 0 }, { batchData, processList }));
        },
        resetBatchState: () => {
            setPlanState(newState());
        }
    };
};
