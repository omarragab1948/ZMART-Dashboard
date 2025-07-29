import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Link } from "react-router";

interface IProps {
  links: { path: string; label: string }[];
}
const CustomBreadcrumb = ({ links }: IProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, i) => {
          return links.length !== i + 1 ? (
            <>
              <BreadcrumbItem key={link.label}>
                <BreadcrumbLink asChild>
                  <Link to={link.path}>{link.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage>{link.label}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
