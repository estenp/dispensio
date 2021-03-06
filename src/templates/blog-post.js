import React from "react";
import PropTypes from "prop-types";
import {kebabCase} from "lodash";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import Content, {HTMLContent} from "../components/Content";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
//building both blog post template and the and the component that uses it, because the template could need to display HTML content?

export const BlogPostTemplate = ({content, contentComponent, description, tags, title, helmet}) => {
	// appears to be saying, if a component is passed in to render content use that, otherwise use the main Content component
	// in the BlogPost component, it's passing in HTMLContent as the prefered content component. Not sure where it's defined
	// but I assume it processes the data in order to escape the markup so you can post code in your blog
	const PostContent = contentComponent || Content;

	return (
		<Layout>
			<section className="section">
				{helmet || ""}
				<div className="container content">
					<div className="columns">
						<div className="column is-10 is-offset-1">
							<article>
								<header>
									<h2 className="title is-5">{title}</h2>
									<h3 className="subtitle is-6">{description}</h3>
								</header>
								<PostContent content={content} />
								{tags && tags.length && (
									<div style={{marginTop: `4rem`}}>
										<h4>Tags</h4>
										<ul className="taglist">
											{tags.map(tag => (
												<li key={tag + `tag`}>
													<Link to={`/tags/${kebabCase(tag)}/`}>
														<span className="tag is-primary">{tag}</span>
													</Link>
												</li>
											))}
										</ul>
									</div>
								)}
							</article>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

BlogPostTemplate.propTypes = {
	content: PropTypes.string.isRequired,
	contentComponent: PropTypes.func,
	description: PropTypes.string,
	title: PropTypes.string,
	helmet: PropTypes.instanceOf(Helmet)
};

const BlogPost = ({data}) => {
	const {markdownRemark: post} = data;

	return (
		<BlogPostTemplate
			content={post.html}
			contentComponent={HTMLContent}
			description={post.frontmatter.description}
			helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
			tags={post.frontmatter.tags}
			title={post.frontmatter.title}
		/>
	);
};

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object
	})
};

export default BlogPost;

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		markdownRemark(id: {eq: $id}) {
			id
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				tags
			}
		}
	}
`;
