import { 
    NextResponse
} from 'next/server';


export async function GET () {
    try {
        const reponse = await fetch('https://api.github.com/repos/nextjs/next.js')
        const repos = await reponse.json();
        return NextResponse.json(repos)

    } catch (error) {
        return NextResponse.json({
            error:'Failed to Fetch repos'
        },{
            status: 500
        })
    }

}