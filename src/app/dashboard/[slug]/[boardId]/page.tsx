"use client";

import AddComponentForm from "@/components/AddComponentForm";
import BoardGrid from "@/components/BoardGrid";
import Dialog from "@/components/Dialog";
import useBoardLayout from "@/hooks/useBoardLayout";
import { Component } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
  const params = useParams<{ boardId: string }>();
  const { data } = useBoardLayout(params.boardId);
  const [open, setOpen] = useState(false);

  return (
    <main className="flex relative flex-1 items-center justify-center text-primary-gray text-h4 overflow-y-auto">
      <BoardGrid boardLayout={data} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        trigger={
          <div className="rounded-xl fixed right-12 bottom-12 transition-colors duration-200 text-primary stroke-primary cursor-pointer hover:bg-primary hover:text-white hover:stroke-white p-4 flex gap-2 bg-primary-resting">
            <span className="text-h4 text-inherit">New</span>
            <Component className="stroke-inherit" />
          </div>
        }
        title="Add component"
        description="Choose what to add to your board"
      >
        <AddComponentForm onSuccess={() => setOpen(false)} />
      </Dialog>
    </main>
  );
};

export default Dashboard;
