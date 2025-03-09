import React, { useState, useEffect } from 'react';
import { Modal } from '@/modules/ui/components/Modal';
import { Button } from '@/modules/ui/components/Button';
import { toast } from 'react-toastify';

function EditSquadNameModal({ isOpen, onClose, squad, onUpdate }) {
  const [squadName, setSquadName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens with new squad
  useEffect(() => {
    if (isOpen && squad) {
      setSquadName(squad.name || '');
    }
  }, [isOpen, squad]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!squadName.trim() || isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onUpdate(squad.id, squadName);
      toast.success('Squad name updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update squad name.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Squad Name"
      size="medium"
      footer={
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!squadName.trim() || isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="squadName" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Squad Name
          </label>
          <input
            type="text"
            id="squadName"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-gray-700 dark:text-white box-border"
            placeholder="Enter squad name"
            required
            autoFocus
          />
        </div>
      </form>
    </Modal>
  );
}

export default EditSquadNameModal;