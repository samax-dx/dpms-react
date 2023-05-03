import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";


const STATES = {
    idle: false,
    addBatch: false,
    editBatch: false,
    doneAddBatch: false,
    addProcess: false,
    editProcess: false,
    doneAddProcess: false
};

const CONTEXT = {
    batchData: {},
    processList: [],
    processData: {}
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
        canOpenAddBatch: () => planState.value.idle,
        canOpenEditBatch: () => planState.value.doneAddBatch || planState.value.doneAddProcess,
        canFinishAddBatch: () => planState.value.addBatch || planState.value.editBatch,
        canOpenAddProcess: () => planState.value.doneAddBatch || planState.value.doneAddProcess,
        canOpenEditProcess: () => planState.value.doneAddProcess,
        canFinishAddProcess: () => planState.value.addProcess || planState.value.editProcess,
        canFinishCreateBatch: () => planState.value.doneAddProcess
    };
};

export const useBatchCreateWizardActions = () => {
    const [planState, setPlanState] = useRecoilState(batchPlanState);

    const {
        canOpenAddBatch, canOpenEditBatch, canFinishAddBatch,
        canOpenAddProcess, canOpenEditProcess, canFinishAddProcess,
        canFinishCreateBatch
    } = useBatchCreateWizardConditions();

    return {
        openAddBatch: () => {
            canOpenAddBatch() && setPlanState(newState({ addBatch: true }));
        },
        openEditBatch: batchData => {
            canOpenEditBatch() && setPlanState(newState({ editBatch: true }, { ...planState.context, batchData }));
        },
        finishAddBatch: batchData => {
            canFinishAddBatch() && setPlanState(newState({ doneAddBatch: true }, { ...planState.context, batchData }));
        },
        openAddProcess: () => {
            canOpenAddProcess() && setPlanState(newState({ addProcess: true }, { ...planState.context }));
        },
        openEditProcess: processData => {
            canOpenEditProcess() && setPlanState(newState({ editProcess: true }, { ...planState.context, processData }));
        },
        finishAddProcess: processData => {
            const processList = [...planState.context.processList];
            processList[Math.max(planState.context.processList.findIndex(proc => proc.batchId === processData.batchId), processList.length)] = processData;

            canFinishAddProcess() && setPlanState(newState({ doneAddProcess: true }, { ...planState.context, processList, processData: {} }));
        },
        finishCreateBatch: () => {
            canFinishCreateBatch() && setPlanState(newState());
        },
        restoreBatchState: (batchData, processList) => {
            setPlanState(newState({ doneAddBatch: true, doneAddProcess: true }, { batchData, processList }));
        },
        resetBatchState: () => {
            setPlanState(newState());
        }
    };
};

export const BatchCreateWizardReactions = {
    useRestoreBatchState: (batchData, batchProcesses) => {
        const { restoreBatchState } = useBatchCreateWizardActions();
        useEffect(() => restoreBatchState(batchData, batchProcesses), [batchData, batchProcesses]);
    },
    useResetBatchState: () => {
        const { resetBatchState } = useBatchCreateWizardActions();
        useEffect(() => resetBatchState(), []);
    }
};
