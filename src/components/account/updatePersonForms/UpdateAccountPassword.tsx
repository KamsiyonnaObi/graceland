"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type UpdateAccountPasswordProps = {};

const UpdateAccountPassword = ({}: UpdateAccountPasswordProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <div className="flex justify-between lg:w-3/5">
          <div>
            <p>New Password</p>
            <p>type in new Password</p>
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
              onClick={() => setIsEditing(false)}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between lg:w-3/5">
          <div>
            <p className="font-bold">Account Password</p>
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

export default UpdateAccountPassword;
