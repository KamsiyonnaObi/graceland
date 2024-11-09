"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateUserPersonalDetails } from "@/server/actions/user.actions";

type UpdatePersonNameProps = {
  firstName?: string;
  lastName: string | null;
};

const UpdatePersonName = ({ firstName, lastName }: UpdatePersonNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const onSubmit = async () => {
    console.log("submitted");
    setIsEditing(false);
  };
  return (
    <>
      {isEditing ? (
        <div className="flex justify-between lg:w-3/5">
          <div>
            <p>Name</p>
            <p>Lhien Rheddit</p>
          </div>
          <div className="flex gap-2">
            <Button
              className="rounded-none"
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="rounded-none px-4 font-bold"
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between lg:w-3/5">
          <div>
            <p className="font-bold">Name</p>
            <p>
              {firstName} {lastName}
            </p>
          </div>
          <Button
            className="font-bold"
            variant="link"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
      )}
    </>
  );
};

export default UpdatePersonName;
