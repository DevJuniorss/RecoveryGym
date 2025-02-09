'use client'

import TableSearchField from '@/components/ui/table-search-field'
import CustomPagination from '@/components/ui/custom-pagination'
import React from 'react'

import { useRouter } from 'next/navigation'
import {
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  SortingState,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'

import {
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Table,
} from '@/components/shadcn/table'
import { FollowUp } from '@/types/followup'
import Link from 'next/link'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { Button } from '../shadcn/button'

type DataType = FollowUp

interface DataTableProps<TData extends DataType, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function FollowUpsTable<TData extends DataType, TValue>({
  columns,
  data,
  from,
  studentId,
  withButton,
}: DataTableProps<TData, TValue> & {
  studentId?: string
  from: 'teachers' | 'students'
  withButton?: boolean
}) {
  const router = useRouter()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  })

  return (
    <div>
      <div className="flex justify-between items-center">
        <TableSearchField
          placeholder="Buscar por grupo muscular..."
          value={
            (table.getColumn('muscleGroup')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('muscleGroup')?.setFilterValue(event.target.value)
          }
          className="flex-1 max-w-sm"
        />
        {withButton && (
          <Button className="bg-primary hover:bg-primary-hover" asChild>
            <Link href={`/follow-ups/create?studentId=${studentId}`}>
              <Plus size={24} />
              Cadastrar acompanhamento
            </Link>
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-primary font-medium"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/follow-ups/${row.original.id}?from=${from}`)
                  }
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={
                        index === 0 ? 'text-primary' : 'text-secondary'
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CustomPagination
        className="mt-2"
        previousPage={table.previousPage}
        nextPage={table.nextPage}
        firstPage={table.firstPage}
        lastPage={table.lastPage}
        setPageIndex={table.setPageIndex}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        totalPages={table.getPageCount()}
        pageIndex={table.getState().pagination.pageIndex}
      />
    </div>
  )
}
