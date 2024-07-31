type Ok<T> = {
    kind: 'ok';
    value: T;
};

type Err<E> = {
    kind: 'err';
    error: E;
};

type ResultType<T, E> = Ok<T> | Err<E>;

export class Result<T, E> {
    private constructor(private readonly result: ResultType<T, E>) { }

    // Método estático para criar um Ok
    static ok<T, E>(value: T): Result<T, E> {
        return new Result({ kind: 'ok', value });
    }

    // Método estático para criar um Err
    static err<T, E>(error: E): Result<T, E> {
        return new Result({ kind: 'err', error });
    }

    // Método para verificar se o Result é Ok
    isOk(): boolean {
        return this.result.kind === 'ok';
    }

    // Método para verificar se o Result é Err
    isErr(): boolean {
        return this.result.kind === 'err';
    }

    // Método para mapear o valor em caso de Ok
    map<U>(fn: (value: T) => U): Result<U, E> {
        if (this.isOk()) {
            const value = (this.result as Ok<T>).value;
            return Result.ok(fn(value));
        }
        const error = (this.result as Err<E>).error;
        return Result.err(error);
    }

    // Método para mapear o erro em caso de Err
    mapErr<F>(fn: (error: E) => F): Result<T, F> {
        if (this.isErr()) {
            const error = (this.result as Err<E>).error;
            return Result.err(fn(error));
        }
        const value = (this.result as Ok<T>).value;
        return Result.ok(value);
    }

    // Método para encadear operações que retornam Result
    async andThen<U>(fn: (value: T) => Promise<Result<U, E>>): Promise<Result<U, E>> {
        if (this.isOk()) {
            const value = (this.result as Ok<T>).value;
            return await fn(value);
        }
        const error = (this.result as Err<E>).error;
        return Result.err(error);
    }

    // Método para acessar o valor caso seja Ok
    unwrap(): T {
        if (this.isOk()) {
            return (this.result as Ok<T>).value;
        } else {
            throw new Error('Attempted to unwrap an Err value');
        }
    }

    // Método para acessar o erro caso seja Err
    unwrapErr(): E {
        if (this.isErr()) {
            return (this.result as Err<E>).error;
        } else {
            throw new Error('Attempted to unwrap an Ok value');
        }
    }
}

