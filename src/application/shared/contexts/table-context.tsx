import { createContext, useContext, useMemo, useState } from "react";


interface TableProviderProps {
  children: React.ReactNode;
}

interface TableProviderState {
  selectedId: string | null;
  setSelectedId(id: string): void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen(b: boolean): void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen(b: boolean): void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen(b: boolean): void;
  isCustomModalOpen: Record<string, boolean>;
  handleCustomModalOpen(modal: string, value: boolean): void;
}

const initialState: TableProviderState = {
  selectedId: null,
  setSelectedId: () => null,
  isDeleteDialogOpen: false,
  setIsDeleteDialogOpen: () => null,
  isAddDialogOpen: false,
  setIsAddDialogOpen: () => null,
  isEditDialogOpen: false,
  setIsEditDialogOpen: () => null,
  isCustomModalOpen: {},
  handleCustomModalOpen: () => null,
}

const TableProviderContext = createContext<TableProviderState>(initialState);

export function TableProvider({ children }: TableProviderProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const [isCustomModalOpen, setIsCustomModalOpen] = useState<Record<string, boolean>>({});

  function handleCustomModalOpen(modal: string, value: boolean) {
    setIsCustomModalOpen((prevState) => ({
      ...prevState,
      [modal]: value
    }));
  }

  const value = useMemo(() => ({
    selectedId,
    setSelectedId,
    isDeleteDialogOpen,
    isAddDialogOpen,
    isEditDialogOpen,
    setIsDeleteDialogOpen,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    isCustomModalOpen,
    handleCustomModalOpen
  }), [isDeleteDialogOpen, isEditDialogOpen, isAddDialogOpen, selectedId, isCustomModalOpen]);

  return (
    <TableProviderContext.Provider value={value}>
      {children}
    </TableProviderContext.Provider>
  )
}

export const useTable = () => {
  const context = useContext(TableProviderContext)

  if (context === undefined)
    throw new Error("useTable must be used within a TableProvider")

  return context;
}
