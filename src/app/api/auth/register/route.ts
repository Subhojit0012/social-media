import {NextRequest, NextResponse} from 'next/server'
import {connectionDB} from "@/lib/db"
import User from '@/models/User'



export async function POST(request: NextRequest){

    try {
        const {email, password} =await request.json()

        if(!email || !password){
            return NextResponse.json({
                error: "Email and password are required!"
            }, {
                status: 400
            })
        }

        await connectionDB()

        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json({
                error: "User already exists!"
            }, {
                status: 400
            })
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json({
            message: "User register successfull!"
        }, {status: 200})


    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}
