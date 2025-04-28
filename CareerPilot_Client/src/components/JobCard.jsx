import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  MapPin,
} from "lucide-react";

const JobCard = ({
  title,
  jobCategory,
  location,
  lowerSalary,
  upperSalary,
  applicationDeadline,
  jobType,
  status,
  skills,
  fulfilled,
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-[1.02] duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{jobCategory}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {fulfilled
                ? "Fulfilled"
                : (status ? status.charAt(0).toUpperCase() + status.slice(1) : "Open")}
            </Badge>
            <button
              className="rounded-full p-1.5 bg-blue-500 hover:bg-blue-600 transition-colors"
              aria-label="View job details"
              onClick={() => console.log(`View details for ${title}`)}
            >
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
            <Separator orientation="vertical" className="mx-1 h-4" />
            <Briefcase className="h-4 w-4" />
            <span>{jobType}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base font-medium">
              ${lowerSalary} - ${upperSalary}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-white font-medium">
              {applicationDeadline}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-2 py-0.5 text-sm bg-blue-950"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {fulfilled && (
          <div className="flex w-full items-center justify-center gap-1.5 rounded-md bg-green-50 py-1.5 text-sm text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <span>Position filled</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
