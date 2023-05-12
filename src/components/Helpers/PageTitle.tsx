import BreadcrumbCom from "../BreadcrumbCom";

export interface IBreadCrumb {
  name?: string;
  path?: string;
}

export interface IPageTitle {
  title?: string;
  breadcrumb?: IBreadCrumb[];
}

export default function PageTitle({ title, breadcrumb = [] }: IPageTitle) {
  return (
    <div className="page-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10">
      <div className="container-x mx-auto">
        <div className="mb-5">
          <BreadcrumbCom paths={breadcrumb} />
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-qblack">{title}</h1>
        </div>
      </div>
    </div>
  );
}
