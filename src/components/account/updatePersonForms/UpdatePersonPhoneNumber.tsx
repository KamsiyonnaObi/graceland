"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type UpdatePersonPhoneNumberProps = {
  phoneNumber: string | null;
};

const UpdatePersonPhoneNumber = ({
  phoneNumber,
}: UpdatePersonPhoneNumberProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <div className="flex justify-between lg:w-3/5">
          <div>
            <p>Phone Number</p>
            <p>+2348034461029</p>
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
            <p className="font-bold">Phone Number</p>
            <p>{phoneNumber ? phoneNumber : "Add a number"}</p>
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

export default UpdatePersonPhoneNumber;
