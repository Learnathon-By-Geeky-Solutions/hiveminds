import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCompany } from "@/contexts/CompanyContext";
import JobPostService from "@/services/JobPostService";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import CreateJobDialog from "./CreateJobDialog";
import UpdateJobDialog from "./UpdateJobDialog";

const JobSection = () => {
  const [createDialog, setCreateDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteJobDialog, setDeleteJobDialog] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { company } = useCompany();
  const companyId = company?.id;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await JobPostService.getAllJobPosts(companyId);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await JobPostService.deleteJobPost(companyId, jobId);
      fetchJobs(); 
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Job Posts</h2>
          <p className="text-muted-foreground">
            Manage your company's job postings here
          </p>
        </div>
        <Button
          onClick={() => setCreateDialog(true)}
          className="flex items-center gap-2 rounded-sm bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add New Job
        </Button>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.jobTitle}</TableCell>
                <TableCell>{job.jobCategory}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.applicationDeadline}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === "OPEN"
                        ? "bg-green-100 text-green-700"
                        : job.status === "CLOSED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-blue-400 hover:bg-blue-400"
                    onClick={() => {
                      setSelectedJob(job);
                      setUpdateDialog(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-red-400 hover:bg-red-500"
                    onClick={() => {
                      setSelectedJob(job);
                      setDeleteJobDialog(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {jobs.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No jobs found. Click 'Add New Job' to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CreateJobDialog
        open={createDialog}
        onOpenChange={setCreateDialog}
        onJobCreated={fetchJobs}
      />
      <UpdateJobDialog
        open={updateDialog}
        onOpenChange={(isOpen) => {
          setUpdateDialog(isOpen);
          if (!isOpen) setSelectedJob(null); 
        }}
        onSuccess={fetchJobs}
        jobData={selectedJob}
      />
      <DeleteConfirmationDialog
        open={deleteJobDialog}
        onOpenChange={(isOpen) => {
          setDeleteJobDialog(isOpen);
          if (!isOpen) setSelectedJob(null); 
        }}
        title="Delete Job Post"
        description="Are you sure you want to delete this job post? This action cannot be undone."
        onConfirm={() => {
          if (!selectedJob?.id) {
            console.error("Job ID is missing. Cannot delete job post.");
            return;
          }
          handleDelete(selectedJob.id); 
          setDeleteJobDialog(false); 
        }}
      />
    </div>
  );
};

export default JobSection;
