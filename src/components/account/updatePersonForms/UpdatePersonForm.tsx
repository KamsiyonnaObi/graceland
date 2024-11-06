"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type UpdatePersonFormProps = {
  firstName?: string;
  lastName: string | null;
};

const UpdatePersonForm = ({ firstName, lastName }: UpdatePersonFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <div className="flex justify-between lg:w-3/5">
          <div>
            <p>Name</p>
            <p>Lhien Rheddit</p>
          </div>
          <Button
            className="font-medium"
            variant="link"
            onClick={() => setIsEditing(false)}
          >
            Edit
          </Button>
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

export default UpdatePersonForm;
