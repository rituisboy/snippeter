import React from "react";
import { Button } from "./ui/button";
import axios from "axios";

const AddOrCreateNew = ({ view }: { view: string }) => {
  const handleCreateNew = async () => {
    const { data: snip } = await axios.post("/api/create");

    const { data } = await axios.patch("/api/library", {
      snipId: snip._id,
      libId: view,
    });
    console.log(data);
  };
  return (
    <div className="size-64 border border-white rounded-lg bg-gray-600  p-1 flex flex-col gap-1">
      <Button variant={"outline"} className="h-1/2  w-full text-xl ">
        Add Existing
      </Button>
      <Button
        onClick={handleCreateNew}
        variant={"outline"}
        className="h-1/2  w-full text-xl "
      >
        Create New
      </Button>
    </div>
  );
};

export default AddOrCreateNew;
