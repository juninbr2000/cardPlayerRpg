import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, type DocumentData, QueryConstraint } from "firebase/firestore";

export const useFetchCollection = <T = DocumentData>(
  collectionName: string,
  field?: string,
  value?: string
) => {
  const [documents, setDocuments] = useState<(T & { id: string })[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadDocuments = async () => {
      if (cancelled) return;

      setLoading(true);
      try {
        const collectionRef = collection(db, collectionName);
        const constraints: QueryConstraint[] = [];

        if (field && value !== undefined) {
          constraints.push(where(field, "==", value));
        }

        const q = constraints.length > 0 ? query(collectionRef, ...constraints) : query(collectionRef);

        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as (T & { id: string })[];

        setDocuments(results);
      } catch (error: any) {
        console.error(error);
        setError(error.message || "Erro ao buscar documentos.");
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [collectionName, field, value, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
