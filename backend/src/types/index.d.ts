import TokenPayload from '../utils/generateToken'

declare global {
    namespace Express{
        interface Request{
            user?: TokenPayload
        }
    }
}