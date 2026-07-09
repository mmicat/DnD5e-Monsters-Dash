import { useParams } from "react-router";

function DetailView() {
    const { id } = useParams(); // hook to grab the ID from the URL

    return (
        <div>
            <h2>Detail View for: {id}</h2>
        </div>
    )
}

export default DetailView;