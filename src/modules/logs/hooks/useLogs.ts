import { useEffect, useState } from 'react';
import { Log } from '../types/log';
import { fetchLogs, updateLog } from '../services/logs.service';

export function useLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchLogs()
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  const saveLog = async (log: Log) => {
    setLoading(true);
    const updated = await updateLog(log);
    setLogs(prev => prev.map(l => l.id === updated.id ? updated : l));
    setLoading(false);
  };

  return { logs, loading, saveLog };
}