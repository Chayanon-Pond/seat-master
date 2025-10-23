"use client";

import React from "react";
import { useConcertForm } from "../hooks/useConcertForm";
import { CustomToast } from "@/components/ui/CustomToast";

export default function ConcertCreate({
  onCreateSuccess,
}: {
  onCreateSuccess?: () => void;
}) {
  const {
    formData,
    isSubmitting,
    handleSubmit,
    handleChange,
    toast,
    setToast,
  } = useConcertForm(onCreateSuccess);

  return (
    <div>
      <div className="form-container">
        <div className="w-full sm:max-w-[480px] sm:mx-auto lg:mx-0 lg:max-w-none">
          <div className="pb-4 border-b border-gray-300">
            <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-[var(--color-light-blue)]">
              Create
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Concert Name and Total Seats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-[16px] sm:text-[20px] md:text-[24px] font-medium text-black mb-2">
                  Concert Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Please input concert name"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[16px] sm:text-[20px] md:text-[24px] font-medium text-black mb-2">
                  Total of seat
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="seat"
                    value={formData.seat || ""}
                    onChange={handleChange}
                    placeholder="500"
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 pr-12"
                  />
                  <img
                    src="/user-back.svg"
                    alt="seat"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[16px] sm:text-[20px] md:text-[24px] font-medium text-black mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please input description"
                required
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-save inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-3"
              >
                <img
                  src="/save.svg"
                  alt="save"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="text-[14px] sm:text-[16px] md:text-[18px]">
                  {isSubmitting ? "Saving..." : "Save"}
                </span>
              </button>
            </div>
          </form>
        </div>

        {toast && (
          <div className="mt-6">
            <CustomToast
              title={toast.title}
              description={toast.description}
              variant={toast.variant}
              onClose={() => setToast(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
