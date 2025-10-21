import { useState, useEffect, useReducer } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, Timestamp, DocumentReference, type DocumentData } from "firebase/firestore";

// Tipagem do estado do reducer
interface InsertState {
  loading: boolean | null;
  error: string | null;
}

// Tipos de ação do reducer
type InsertAction =
  | { type: "LOADING" }
  | { type: "INSERTED_DOC"; payload: DocumentReference<DocumentData> }
  | { type: "ERROR"; payload: string };

// Estado inicial
const initialState: InsertState = {
  loading: null,
  error: null,
};

// Reducer
const insertReducer = (state: InsertState, action: InsertAction): InsertState => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Hook genérico
export const useInsertDocument = <T extends DocumentData>(docCollection: string) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action: InsertAction) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document: T) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(collection(db, docCollection), newDocument);

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });

      return insertedDocument;
    } catch (error: any) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message || "Erro ao inserir documento." });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};
