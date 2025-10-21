import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { doc, getDoc, type DocumentData } from "firebase/firestore";

// <T> é o tipo genérico do documento — assim você pode usar o hook com qualquer interface
export const useFetchDocument = <T = DocumentData>(
  docCollection: string,
  id: string
) => {
  const [document, setDocument] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {
      if (cancelled) return;

      setLoading(true);
      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocument(docSnap.data() as T);
        } else {
          setError("Documento não encontrado.");
        }
      } catch (error: any) {
        console.error(error);
        setError(error.message || "Erro ao buscar documento.");
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};
