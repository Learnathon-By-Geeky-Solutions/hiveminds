"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import EditJobPostDialog from "./EditJobPostDialog";

const JobSection = () => {
  // Mock data for job posts and companies
  const mockJobPosts = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company_id: 1,
      companyName: "Acme Corporation",
      location: "San Francisco, CA",
      type: "Full-time",
      category: "Engineering",
      salary: "$120,000 - $150,000",
      deadline: "2023-12-15",
      description:
        "We are looking for a senior software engineer to join our team.",
      requirements:
        "5+ years of experience in software development, proficient in JavaScript and React.",
    },
    {
      id: 2,
      title: "Product Manager",
      company_id: 1,
      companyName: "Acme Corporation",
      location: "Remote",
      type: "Full-time",
      category: "Product",
      salary: "$110,000 - $130,000",
      deadline: "2023-11-30",
      description:
        "Join our product team to help shape the future of our platform.",
      requirements:
        "3+ years of product management experience, strong analytical skills.",
    },
    {
      id: 3,
      title: "UX Designer",
      company_id: 2,
      companyName: "Globex Industries",
      location: "Chicago, IL",
      type: "Full-time",
      category: "Design",
      salary: "$90,000 - $110,000",
      deadline: "2023-12-10",
      description: "Help us create beautiful and intuitive user experiences.",
      requirements:
        "Portfolio showcasing UX design work, experience with Figma.",
    },
    {
      id: 4,
      title: "Marketing Coordinator",
      company_id: 3,
      companyName: "Initech",
      location: "Austin, TX",
      type: "Part-time",
      category: "Marketing",
      salary: "$50,000 - $65,000",
      deadline: "2023-11-25",
      description:
        "Support our marketing team with campaigns and content creation.",
      requirements:
        "Bachelor's degree in Marketing or related field, social media experience.",
    },
    {
      id: 5,
      title: "Data Scientist",
      company_id: 4,
      companyName: "Massive Dynamics",
      location: "Boston, MA",
      type: "Full-time",
      category: "Data Science",
      salary: "$130,000 - $160,000",
      deadline: "2023-12-20",
      description:
        "Join our data science team to extract insights from complex datasets.",
      requirements:
        "Advanced degree in Computer Science, Statistics, or related field. Experience with machine learning.",
    },
  ];

  const mockDepartment = [
    { id: 1, name: "HR" },
    { id: 2, name: "Logi" },
    { id: 3, name: "HR" },
    { id: 4, name: "HR" },
    { id: 5, name: "Engr." },
    { id: 6, name: "Engr." },
  ];

  // State for search term, filters, job posts, editing, and deleting
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [jobPosts, setJobPosts] = useState(mockJobPosts);
  const [editingJobPost, setEditingJobPost] = useState(null);
  const [deletingJobPostId, setDeletingJobPostId] = useState(null);

  // Filter job posts based on search term, company filter, and type filter
  const filteredJobPosts = jobPosts.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany =
      companyFilter === "all" || job.company_id.toString() === companyFilter;
    const matchesType =
      typeFilter === "all" ||
      job.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesCompany && matchesType;
  });

  // Handle job post update
  const handleUpdateJobPost = (updatedJobPost) => {
    setJobPosts((prevJobPosts) =>
      prevJobPosts.map((job) =>
        job.id === updatedJobPost.id ? { ...job, ...updatedJobPost } : job
      )
    );
    setEditingJobPost(null); // Close the dialog
  };

  // Handle job post deletion
  const handleDeleteJobPost = (id) => {
    setJobPosts((prevJobPosts) => prevJobPosts.filter((job) => job.id !== id));
    setDeletingJobPostId(null); // Close the dialog
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search job posts..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {mockDepartment.map((company) => (
                <SelectItem key={company.id} value={company.id.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Job Posts Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Deadline</TableHead> {/* Always show Deadline */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobPosts.length > 0 ? (
              filteredJobPosts.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.companyName}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={job.type === "Full-time" ? "default" : "outline"}
                    >
                      {job.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(job.deadline) < new Date() ? (
                      <Badge variant="destructive">Expired</Badge>
                    ) : (
                      new Date(job.deadline).toLocaleDateString()
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setEditingJobPost(job)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeletingJobPostId(job.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No job posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Job Post Dialog */}
      {editingJobPost && (
        <EditJobPostDialog
          jobPost={editingJobPost}
          companies={mockDepartment}
          open={!!editingJobPost}
          onOpenChange={(open) => !open && setEditingJobPost(null)}
          onSave={handleUpdateJobPost}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deletingJobPostId !== null && (
        <DeleteConfirmationDialog
          open={deletingJobPostId !== null}
          onOpenChange={(open) => !open && setDeletingJobPostId(null)}
          onConfirm={() => handleDeleteJobPost(deletingJobPostId)}
          title="Delete Job Post"
          description="Are you sure you want to delete this job post? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default JobSection;
