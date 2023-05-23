import { atom, useRecoilState, useRecoilValue } from "recoil";


const STATES = {
    idle: true,
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
 * @param {plan_state_t} state
 * @param {plan_stateval_t} value 
 * @param {plan_contextval_t} context 
 * @returns {plan_state_t} 
 */
function updateState(state, value, context) {
    return { value: { ...state.value, ...value }, context: { ...state.context, ...context } };
}

/**
 * @param {plan_stateval_t} value 
 * @param {plan_contextval_t} context 
 * @returns {plan_state_t} 
 */
function resetState(value = {}, context = {}) {
    return updateState({ value: STATES, context: CONTEXT }, value, context);
}

const batchPlanState = atom({
    key: "batchPlanState",
    default: resetState()
});

export const useBatchCreateWizardContext = () => useRecoilValue(batchPlanState).context;

export const useBatchCreateWizardConditions = () => {
    const planState = useRecoilValue(batchPlanState);
    return {
        canOpenEditBatch: () => planState.value.idle,
        isEditingBatch: () => planState.value.editBatch,
        canFinishEditBatch: () => planState.value.editBatch,
        hasFinishedEditBatch: () => planState.value.doneEditBatch,
        canOpenEditProcess: () => planState.value.idle && planState.value.doneEditBatch,
        isEditingProcess: () => planState.value.editProcess,
        canFinishEditProcess: () => planState.value.editProcess,
        hasFinishedEditProcess: () => planState.value.doneEditProcess,
        canFinishEdit: () => planState.value.idle && planState.value.doneEditBatch
    };
};

export const useBatchCreateWizardActions = () => {
    const [planState, setPlanState] = useRecoilState(batchPlanState);

    const {
        canOpenEditBatch, isEditingBatch, canFinishEditBatch, hasFinishedEditBatch,
        canOpenEditProcess, isEditingProcess, canFinishEditProcess, hasFinishedEditProcess,
        canFinishEdit
    } = useBatchCreateWizardConditions();

    return {
        openEditBatch: batchData => {
            canOpenEditBatch() && setPlanState(updateState(planState, { idle: false, editBatch: true, doneEditBatch: false }, { batchData }));
        },
        updateEditBatch: batchData => {
            isEditingBatch() && setPlanState(updateState(planState, {}, { batchData }))
        },
        finishEditBatch: batchData => {
            canFinishEditBatch() && setPlanState(updateState(planState, { idle: true, doneEditBatch: true, editBatch: false }, { batchData }));
        },
        openEditProcess: (processData, editIndex) => {
            const processList = [...planState.context.processList];
            processList[editIndex] = { ...processData };

            canOpenEditProcess() && setPlanState(updateState(planState, { idle: false, editProcess: true, doneEditProcess: false }, { processList, editIndex }));
        },
        syncEditProcess: (processData, editIndex) => {
            const processList = [...planState.context.processList];
            processList[editIndex] = { ...processData };

            isEditingProcess() && setPlanState(updateState(planState, {}, { processList, editIndex }));
        },
        finishEditProcess: (processData) => {
            const editIndex = planState.context.editIndex;
            const processList = [...planState.context.processList];
            processList[editIndex] = { ...processData };

            canFinishEditProcess() && setPlanState(updateState(planState, { idle: true, doneEditProcess: true, editProcess: false }, { processList, editIndex: -1 }));
        },
        finishEdit: () => {
            canFinishEdit() && setPlanState(resetState());
        },
        restoreBatchState: (batchData, processList) => {
            setPlanState(resetState({ doneEditBatch: !!batchData.batchId, doneEditProcess: processList.length > 0 }, { batchData, processList }));
        },
        resetBatchState: () => {
            setPlanState(resetState());
        }
    };
};
