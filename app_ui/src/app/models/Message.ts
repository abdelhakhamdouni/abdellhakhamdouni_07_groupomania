import User from 'src/app/models/User';
export default interface Message {
    id: number;
    UserId: User;
    message: string;
    createdAt: string;
    updatedAt: string;
}