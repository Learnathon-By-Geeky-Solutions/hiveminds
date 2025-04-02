import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import JobPostService from "@/services/JobPostService";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import EditJobPostDialog from "./EditJobPostDialog";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";

const JobSection = ({ companyId }) => {
  const [jobs, setJobs] = useState([]); // Jobs array
  const [editingJob, setEditingJob] = useState(null); // Job being edited
  const [deletingJobId, setDeletingJobId] = useState(null); // Job ID being deleted

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await JobPostService.getAllJobPosts(companyId);
        console.log("Fetched jobs:", response.data);
        setJobs(response.data); // Assuming API returns an array of jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [companyId]);

  // Handle job update
  const handleUpdateJob = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    setEditingJob(null); // Close the dialog
  };

  // Handle job deletion
  const handleDeleteJob = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    setDeletingJobId(null); // Close the dialog
  };

  return (
    <div className="space-y-4">
      {/* Job Posts Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Fulfilled</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.jobTitle}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        job.jobType === "Full-time" ? "default" : "outline"
                      }
                    >
                      {job.jobType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(job.applicationDeadline) < new Date() ? (
                      <Badge variant="destructive">Expired</Badge>
                    ) : (
                      new Date(job.applicationDeadline).toLocaleDateString()
                    )}
                  </TableCell>
                  <TableCell>
                    {job.fulfilled ? (
                      <Badge variant="success">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {job.skills && job.skills.length > 0 ? (
                      <ul className="flex flex-wrap gap-1">
                        {job.skills.map((skill, index) => (
                          <li key={index}>
                            <Badge variant="secondary">
                              {skill.skillName} - {skill.proficiencyLevel}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No skills added"
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
                          onClick={() => setEditingJob(job)} // Open edit dialog
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeletingJobId(job.id)} // Open delete dialog
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
                <TableCell colSpan={7} className="h-24 text-center">
                  No jobs found for this company.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Job Post Dialog */}
      {editingJob && (
        <EditJobPostDialog
          jobPost={editingJob}
          open={!!editingJob}
          onOpenChange={(open) => !open && setEditingJob(null)}
          onSave={handleUpdateJob}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deletingJobId !== null && (
        <DeleteConfirmationDialog
          open={deletingJobId !== null}
          onOpenChange={(open) => !open && setDeletingJobId(null)}
          onConfirm={() => handleDeleteJob(deletingJobId)}
          title="Delete Job Post"
          description="Are you sure you want to delete this job post? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default JobSection;
