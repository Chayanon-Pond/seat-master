import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomToast_Notification } from "@/components/ui/CustomToast";

interface ConcertFormData {
    name: string;
    description: string;
    seat: number;
}

interface Toast {
    title: string;
    description: string;
    variant: "success" | "error" | "default";
}

export const useConcertForm = (onSuccess?: () => void) => {
    const [formData, setFormData] = useState<ConcertFormData>({
        name: "",
        description: "",
        seat: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<Toast | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "seat" ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {    
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Validation
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Please enter concert name";
        } else if (formData.name.length > 100) {
            newErrors.name = "Concert name is too long (max 100 characters)";
        }

        if (!formData.seat || formData.seat <= 0) {
            newErrors.seat = "Please enter valid seat number";
        } else if (formData.seat > 100000) {
            newErrors.seat = "Seat number is too large (max 100000)";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Please enter description";
        } else if (formData.description.trim().length < 10) {
            newErrors.description = "Description must be at least 10 characters";
        } else if (formData.description.length > 500) {
            newErrors.description = "Description is too long (max 500 characters)";
        }

        if (Object.keys(newErrors).length > 0) {
            setError(Object.values(newErrors)[0]);
            const errorToast: Toast = {
                title: "Validation Error",
                description: Object.values(newErrors)[0],
                variant: "error",
            };
            setToast(errorToast);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/admin/concerts-create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to create concert");
            }

            const data = await response.json();
            const successToast: Toast = {
                title: "Success",
                description: "Concert created successfully",
                variant: "success",
            };
            setToast(successToast);
            CustomToast_Notification.create();
    
            setFormData({
                name: "",
                description: "",
                seat: 0,
            });

            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "An error occurred";
            setError(message);
            const errorToast: Toast = {
                title: "Error",
                description: message,
                variant: "error",
            };
            setToast(errorToast);
            console.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        setFormData,
        isSubmitting,
        error,
        toast,
        setToast,
        handleChange,
        handleSubmit,
    };
};