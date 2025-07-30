import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";

interface IProps {
  links: { path: string; label: string }[];
}
const CustomBreadcrumb = ({ links }: IProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, i) => {
          return links.length !== i + 1 ? (
            <Fragment key={link.label}>
              <BreadcrumbItem key={link.label}>
                <BreadcrumbLink asChild>
                  <Link to={link.path}>{link.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ) : (
            <BreadcrumbItem key={link.label}>
              <BreadcrumbPage>{link.label}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
