import CustomBreadcrumb from "./CustomBreadcrumb";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa";

interface BreadcrumbLink {
  path: string;
  label: string;
}

interface PageHeaderProps {
  title: string;
  links?: BreadcrumbLink[];
  action?: React.ReactNode;
  showBackButton?: boolean;
}

const PageHeader = ({
  title,
  links = [],
  action,
  showBackButton = true,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button variant="ghost" className="cursor-pointer" onClick={goBack}>
              <FaArrowLeft />
            </Button>
          )}
          <h2 className="font-bold text-lg md:text-2xl">{title}</h2>
        </div>
        {action && <div>{action}</div>}
      </div>
      {links.length > 0 && <CustomBreadcrumb links={links} />}
    </div>
  );
};

export default PageHeader;
