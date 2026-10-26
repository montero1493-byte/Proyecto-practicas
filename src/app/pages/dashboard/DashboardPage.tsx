import { useAppSelector } from "../../store/hooks/hooks";
import { useEffect, useState } from "react";
import { getComments } from "../../../services/CommentService";
import Highcharts from "highcharts";
import type { Comment } from "../../../types/comment";
import HighchartsReactModule from "highcharts-react-official";

const HighchartsReact = (HighchartsReactModule as any).default;

const DashboardPage = () => {
  const posts = useAppSelector((state) =>
    state.posts.posts);

  const totalPosts = posts.length;

  const totalUsers = new Set(
    posts.map((post) => post.userId)).size;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalComments = comments.length;
  
  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);

        const data = await getComments();
      
        setComments(data);
      } catch {
        setError("No se cargaron los comentarios");
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, []);

  const PostsByUser = Array.from(
    {length: totalUsers}, (_, index) => {
      const userId = index + 1;

      return posts.filter(
        (post) => post.userId === userId
      ).length;
    }
  );

  const commentsByUser = Array.from(
    {length: totalUsers}, (_, index) => {
      const userId = index + 1;

      const userPosts = posts.filter(
        (post) => post.userId === userId
      );

      const postIds = userPosts.map(
        (post) => post.id
      );

      return comments.filter(
        (comment) =>
          postIds.includes(comment.postId)
      ).length;
    }
  );

  const categories = Array.from(
    {length: totalUsers}, (_, index) => 
      `Usuario ${index + 1}`
  );

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
    }, 

    title: {
      text: "Posts y comentarios por usuario",
    }, 

    xAxis: {
      categories, 
    }, 

    yAxis: {
      title: {
        text: "Cantidad", 
      },
    }, 

    series: [
      {
        type: "column", 
        name: "Posts", 
        data: PostsByUser,
      }, 
      {
        type: "column",
        name: "Comentarios",
        data: commentsByUser
      }
    ],
  };

  return (
    <>
    {error && (<p>{error}</p>)}

        <h1>Dashboard</h1>

        <div>
          <div>
            <h2>Posts Totales</h2>
            <p>{totalPosts}</p>
            </div>
          <div>
            <h2>Usuarios Totales</h2>
            <p>{totalUsers}</p>
            </div>
          <div>
            <h2>Comentarios Totales</h2>
            <p>{totalComments}</p>
            </div>
        </div>
        
        {loading ? (
          <p>Cargando grafica</p>) : (
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        )}
    </>
  );
};

export default DashboardPage;