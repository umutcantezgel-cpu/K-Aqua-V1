import { expose } from 'comlink';
import { calculateLCA, LCAParams } from './lca-calculator';

const workerAPI = {
  processLCA(params: LCAParams) {
    // We can run millions of calculations without blocking the UI thread
    return calculateLCA(params);
  }
};

export type LCAWorkerAPI = typeof workerAPI;

expose(workerAPI);
