
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Conversation } from "@/types/chat";

interface ChatDialogsProps {
  renameDialogOpen: boolean;
  deleteDialogOpen: boolean;
  newTitle: string;
  selectedConversation: Conversation | null;
  onRenameClose: () => void;
  onDeleteClose: () => void;
  onNewTitleChange: (value: string) => void;
  onConfirmRename: () => void;
  onConfirmDelete: () => void;
}

export const ChatDialogs = ({
  renameDialogOpen,
  deleteDialogOpen,
  newTitle,
  selectedConversation,
  onRenameClose,
  onDeleteClose,
  onNewTitleChange,
  onConfirmRename,
  onConfirmDelete,
}: ChatDialogsProps) => {
  return (
    <>
      <Dialog open={renameDialogOpen} onOpenChange={onRenameClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => onNewTitleChange(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg"
              placeholder="Enter new title"
            />
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <button
              onClick={onRenameClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirmRename}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
            >
              Rename
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={onDeleteClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chat</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p>Are you sure you want to delete this chat?</p>
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <button
              onClick={onDeleteClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
