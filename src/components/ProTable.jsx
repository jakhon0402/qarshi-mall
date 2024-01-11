import React, { useCallback, useEffect, useState } from "react";
import date from "date-and-time";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Select,
} from "@nextui-org/react";

import { capitalize } from "../utils/utils";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import CreateModal from "./Modals/CreateModal";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import { useSelector } from "react-redux";
import { getMoneyPattern } from "../utils/regex";
import { useLocation, useNavigate } from "react-router-dom";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const ProTable = ({
  isSearch = true,
  tableName = "Ma'lumot",
  createData,
  editData,
  tableData,
  columns,
  initialVisibleColumns,
  isFilterCtg,
  createSubmitHandler,
  editSubmitHandler,
  deleteSubmitHandler,
  viewButtonUrl,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { categories } = useSelector((state) => state.categories);

  const [selectCategories, setSelectCategories] = useState([]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(initialVisibleColumns)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...tableData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== categories.length
    ) {
      console.log(Array.from(statusFilter));
      console.log(filteredUsers);
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.category.id + "")
      );
    }

    return filteredUsers;
  }, [tableData, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <span className='font-bold text-[14px]'>{cellValue}</span>
          //   <User
          //     avatarProps={{ radius: "lg", src: user.avatar }}
          //     description={user.email}
          //     name={cellValue}
          //   >
          //     {user.email}
          //   </User>
        );
      case "role":
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-small capitalize'>{cellValue}</p>
            <p className='text-bold text-tiny capitalize text-default-400'>
              {user.team}
            </p>
          </div>
        );

      case "attachment.id":
        return (
          <div className='flex flex-col'>
            <img
              className='w-[80px]'
              src={`http://localhost:8084/api/fayl/download/${user?.fileEntity?.id}`}
            />
          </div>
        );

      case "price":
        return (
          <div className='flex flex-col'>
            <span className='font-bold'>{`${
              cellValue ? getMoneyPattern(cellValue) : ""
            } so'm`}</span>
          </div>
        );

      case "currentSalary":
        return (
          <div className='flex flex-col'>
            <span className='font-bold'>{`${
              cellValue ? getMoneyPattern(cellValue) : ""
            } so'm`}</span>
          </div>
        );
      case "createdAt": {
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-small capitalize'>
              {date.format(new Date(cellValue), "ddd, MMM DD YYYY HH:mm")}
            </p>
          </div>
        );
      }
      case "status":
        return (
          <Chip
            className='capitalize'
            color={statusColorMap[user.status]}
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        );
      case "actions": {
        if ("category" in user) {
          user = {
            ...user,
            categoryId: user.category ? user.category.id + "" : null,
          };
        }

        return (
          <div className='relative flex items-center gap-5'>
            {viewButtonUrl && (
              <button
                onClick={() => navigate(`${viewButtonUrl}/${user?.id}`)}
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
              >
                <EyeIcon className='w-[18px] text-green-500' />
              </button>
            )}
            <EditModal
              ctgs={categories}
              handlerSubmit={(body) => editSubmitHandler(body)}
              fields={editData?.fields}
              validationSchema={editData?.validationSchema}
              initialValues={
                location.pathname.startsWith("/inventory")
                  ? {
                      fileEntityId: user?.fileEntity?.id,
                      name: user?.name,
                      price: user?.price,
                      count: user?.count,
                      description: user?.description,
                    }
                  : user
              }
            />

            <DeleteModal
              contextText={user?.name ? user?.name : tableName}
              handleSubmit={() => deleteSubmitHandler(user?.id)}
            />
          </div>
          //   <div className='relative flex justify-end items-center gap-2'>
          //     <Dropdown>
          //       <DropdownTrigger>
          //         <Button isIconOnly size='sm' variant='light'>
          //           <EllipsisVerticalIcon className='text-default-300 w-[18px]' />
          //         </Button>
          //       </DropdownTrigger>
          //       <DropdownMenu>
          //         <DropdownItem>View</DropdownItem>
          //         <DropdownItem>Edit</DropdownItem>
          //         <DropdownItem>Delete</DropdownItem>
          //       </DropdownMenu>
          //     </Dropdown>
          //   </div>
        );
      }
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          {isSearch ? (
            <Input
              isClearable
              className='w-full sm:max-w-[44%]'
              placeholder="Nomi bo'yicha qidirish..."
              startContent={<MagnifyingGlassIcon className='w-[18px]' />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          ) : (
            <span className='text-[18px] font-bold text-black'>
              {tableName + "lar jadvali"}
            </span>
          )}
          <div className='flex gap-3 z-0'>
            {isFilterCtg && (
              <Dropdown>
                <DropdownTrigger className='hidden sm:flex'>
                  <Button
                    endContent={
                      <ChevronDownIcon className='text-small w-[18px]' />
                    }
                    variant='flat'
                  >
                    Kategoriyalar
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label='Table Columns'
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode='multiple'
                  onSelectionChange={setStatusFilter}
                >
                  {categories &&
                    categories?.map((ctg) => (
                      <DropdownItem key={ctg.id} className='capitalize'>
                        {capitalize(ctg.name)}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            )}
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button
                  endContent={
                    <ChevronDownIcon className='text-small w-[18px]' />
                  }
                  variant='flat'
                >
                  Ustunlar
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode='multiple'
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className='capitalize'>
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <CreateModal
              ctgs={categories}
              handleSubmit={createSubmitHandler}
              btnText={`${tableName} qo'shish`}
              fields={createData?.fields}
              validationSchema={createData?.validationSchema}
              initialValues={createData?.initialValues}
            />
          </div>
        </div>
        {/* <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {tableData.length} tableData
          </span>
          <label className='flex items-center text-default-400 text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div> */}
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    tableData.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <span className='w-[30%] text-small text-default-400'>
          {/* {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`} */}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Oldingi
          </Button>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Keyingi
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label='Example table with custom cells, pagination and sorting'
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: "max-h-[650px]",
      }}
      selectedKeys={selectedKeys}
      //   selectionMode='multiple'
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement='outside'
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        style={{ color: "#000" }}
        emptyContent={"Ma'lumot topilmadi."}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id} className='h-[50px]'>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProTable;
