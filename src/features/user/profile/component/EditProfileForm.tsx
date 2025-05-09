import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateProfileMutation } from "../api";
import { toast } from "sonner";
const formSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string(),
  location: z.string().min(2, "location must be at least 2 characters"),
});
type FormSchema = z.infer<typeof formSchema>;

interface EditProfileFormProps {
  displayName: string;
  location: string;
  bio: string;
  openerId: number;
  onSave: () => void;
}
export const EditProfileForm: FC<EditProfileFormProps> = ({
  openerId,
  displayName,
  bio,
  location,
  onSave,
}) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const handleUpdateProfile = async (data: FormSchema) => {
    try {
      updateProfile({
        ...data,
        openerId,
      }).unwrap();
      onSave();
      toast.success("Update profile successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName,
      bio,
      location,
    },
  });
  return (
    <DialogContent className="min-w-[600px]">
      <DialogHeader>
        <DialogTitle>Update profile</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProfile)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="flex">
                <FormLabel asChild>
                  <p>Display name</p>
                </FormLabel>
                <FormControl className="w-90">
                  <Input placeholder="Ex Griffin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel asChild>
                  <p>Biography</p>
                </FormLabel>
                <FormControl>
                  <Textarea
                    maxLength={400}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel asChild>
                  <p>Location</p>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Eg: VietNam" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="VietNam">VietNam</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
