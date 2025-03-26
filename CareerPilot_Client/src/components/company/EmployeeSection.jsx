import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import EditEmployeeDialog from "./EditEmployeeDialog";

const EmployeeSection = () => {
  // Mock data for employees and companies
  const mockEmployees = [
    {
      id: 1,
      name: "John Doe",
      jobTitle: "Software Engineer",
      companyName: "TechCorp",
      companyId: 1,
      hireDate: "2023-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      jobTitle: "Product Manager",
      companyName: "Innovate Inc.",
      companyId: 2,
      hireDate: "2022-05-20",
      status: "inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      jobTitle: "Data Analyst",
      companyName: "FutureTech",
      companyId: 3,
      hireDate: "2021-08-10",
      status: "terminated",
    },
  ];

  const mockCompanies = [
    { id: 1, name: "HR" },
    { id: 2, name: "Engr." },
    { id: 3, name: "Logistic" },
  ];

  // State for search term, filters, employees, editing, and deleting
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [employees, setEmployees] = useState(mockEmployees);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);

  // Filter employees based on search term, company filter, and status filter
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany =
      companyFilter === "all" ||
      employee.companyId.toString() === companyFilter;
    const matchesStatus =
      statusFilter === "all" || employee.status === statusFilter;
    return matchesSearch && matchesCompany && matchesStatus;
  });

  // Handle employee update
  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp
      )
    );
    setEditingEmployee(null); // Close the dialog
  };

  // Handle employee deletion
  const handleDeleteEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.id !== id)
    );
    setDeletingEmployeeId(null); // Close the dialog
  };

  // Helper function to render status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "terminated":
        return <Badge variant="destructive">Terminated</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search employees..."
          className="max-w-sm text-base rounded-sm p-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-[180px] p-6">
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent className="rounded-sm p-4">
              <SelectItem className="text-base" value="all">
                All Department
              </SelectItem>
              {mockCompanies.map((company) => (
                <SelectItem
                  className="text-base"
                  key={company.id}
                  value={company.id.toString()}
                >
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] p-6">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="rounded-sm p-4">
              <SelectItem className="text-base" value="all">
                All Statuses
              </SelectItem>
              <SelectItem className="text-base" value="active">
                Active
              </SelectItem>
              <SelectItem className="text-base" value="inactive">
                Inactive
              </SelectItem>
              <SelectItem className="text-base" value="terminated">
                Terminated
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="rounded-sm border">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary text-secondary-foreground text-base font-medium">
              <TableHead className="p-3">Name</TableHead>
              <TableHead className="p-3">Job Title</TableHead>
              <TableHead className="p-3">Department</TableHead>
              <TableHead className="p-3">Hire Date</TableHead>
              <TableHead className="p-3">Status</TableHead>
              <TableHead className="text-right p-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="text-base p-4">
                    {employee.name}
                  </TableCell>
                  <TableCell className="text-base p-4">
                    {employee.jobTitle}
                  </TableCell>
                  <TableCell className="text-base p-4">
                    {employee.companyName}
                  </TableCell>
                  <TableCell>
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-base p-4">
                    {getStatusBadge(employee.status)}
                  </TableCell>
                  <TableCell className="text-right text-base p-4">
                    <div className="space-x-2 sm:space-y-2">
                      <Button
                        className="h-10 w-10 border-blue-400 hover:bg-blue-400 rounded-sm"
                        variant="outline"
                        size="icon"
                        onClick={() => setEditingEmployee(employee)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit Company</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 border-red-400 hover:bg-red-500 rounded-sm"
                        onClick={() => setDeletingEmployeeId(employee.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Company</span>
                      </Button>
                    </div>
                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setEditingEmployee(employee)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeletingEmployeeId(employee.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Employee Dialog */}
      {editingEmployee && (
        <EditEmployeeDialog
          employee={editingEmployee}
          companies={mockCompanies}
          open={!!editingEmployee}
          onOpenChange={(open) => !open && setEditingEmployee(null)}
          onSave={handleUpdateEmployee}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deletingEmployeeId !== null && (
        <DeleteConfirmationDialog
          open={deletingEmployeeId !== null}
          onOpenChange={(open) => !open && setDeletingEmployeeId(null)}
          onConfirm={() => handleDeleteEmployee(deletingEmployeeId)}
          title="Delete Employee"
          description="Are you sure you want to delete this employee? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default EmployeeSection;
