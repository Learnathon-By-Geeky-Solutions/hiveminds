import { Button } from "@/components/ui/button"; // Import the Button component
import React from "react";
import CreateCompanyDialog from "./CreateCompanyDialog";

const AddNewCompanyPage = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false); // State to control dialog visibility

  return (
    <div className="container mx-auto py-12 space-y-8 text-center animate-fade-in">
      {/* Eye-catching tagline */}
      <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-primary to-secondary inline-block px-4 py-2 rounded-md">
        Start Your Journey Today!
      </h1>
      <p className="text-lg text-muted-foreground">
        Create your company profile and unlock new opportunities.
      </p>

      {/* Button to open the dialog */}
      <Button
        className="bg-primary text-white text-base hover:bg-primary/90 transition px-6 py-6 rounded-sm"
        onClick={() => setIsDialogOpen(true)}
      >
        Create New Company
      </Button>

      {/* Dialog for creating a company */}
      <CreateCompanyDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};

export default AddNewCompanyPage;
