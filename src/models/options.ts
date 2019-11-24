export abstract class Options {
  orderBy: Order
  page?: number // index start at 1
  limit?: number

  constructor(orderBy: Order, page?: number, limit?: number) {
    this.orderBy = orderBy
    this.page = page
    this.limit = limit
  }
}

export interface Order {
  field: string
  direction: 'desc' | 'asc' | undefined
}

