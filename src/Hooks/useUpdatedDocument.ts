import { useState, useEffect, useReducer } from "react";
import { db } from "../config/firebase";
import { updateDoc, doc, type DocumentData } from "firebase/firestore";

interface UpdateState {
  loading: boolean | null;
  error: string | null;
}

type Action =
  | { type: "LOADING" }
  | { type: "UPDATED_DOC" }
  | { type: "ERROR"; payload: string };

const initialState: UpdateState = {
  loading: null,
  error: null,
};

function updateReducer(state: UpdateState, action: Action): UpdateState {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useUpdateDocument<T extends DocumentData>(docCollection: string) {
  const [response, dispatch] = useReducer(updateReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action: Action) => {
    if (!cancelled) dispatch(action);
  };

  const updateDocument = async (id: string, data: Partial<T>) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const docRef = doc(db, docCollection, id);
      await updateDoc(docRef, data);
      checkCancelBeforeDispatch({ type: "UPDATED_DOC" });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { updateDocument, response };
}
