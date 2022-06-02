export interface Loan {
    loanId?: number;
    clientId: number;
    loanDate: Date;
    returnDate: Date;
    status: number;
}