import { createCsvTask } from '@/common/csv-task';
import { createTask } from '@/common/task';
import path from 'path';

createTask({
  input: async () => {
    return [{ id: 1 }];
  },
  processRow: async (row, task): Promise<void> => {
    console.log('🚀 ~ file: test-task.ts:8 ~ row:', row.id);
  },
});

createCsvTask({
  input: path.join(__dirname, 'download-file.csv'),
  processRow: async (row, task): Promise<void> => {
    console.log('🚀 ~ file: test-task.ts:8 ~ row:', row.url);
  },
});
