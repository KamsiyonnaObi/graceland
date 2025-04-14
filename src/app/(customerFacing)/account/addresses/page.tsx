"use client";

import { Suspense } from "react";
import UpdateAddressForm from "@/features/account/containers/updateAddress/updateAddressForm";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Address } from "@prisma/client";
import { toast } from "sonner";

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/addresses');
      if (!response.ok) throw new Error('Failed to fetch addresses');
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      toast.error('Failed to load addresses');
    } 
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/addresses?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete address');
      
      setAddresses(addresses.filter(addr => addr.id !== id));
      toast.success('Address deleted successfully');
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);



  return (
    <section className="flex flex-col gap-4">
      <div className="header">
        <h3 className="mb-2 text-xl font-bold">Addresses</h3>
        <p>Add and manage your delivery addresses</p>
      </div>

      <div className="grid gap-4  w-full">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardContent className="p-4">
              <div className="mb-4">
                <p className="font-medium">{address.address}</p>
                <p className="text-sm text-gray-600">
                  {address.state}, {address.country} {address.zipCode}
                </p>
              </div>
              <UpdateAddressForm 
                address={address} 
                onDelete={handleDelete}
                showForm={editingId === address.id}
                onShowFormChange={(show) => setEditingId(show ? address.id : null)}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex align-start">
        <UpdateAddressForm 
          onSubmitComplete={() => {
            fetchAddresses();
            setIsAddingNew(false);
          }}
          showForm={isAddingNew}
          onShowFormChange={setIsAddingNew}
        />
      </div>
    </section>
  );
};

export default AddressesPage;


