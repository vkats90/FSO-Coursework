
PSQL="psql postgresql://bloglist_wuyv_user:28coRaEGGE1dbZPHBfHoGi3PK8kxXR3Y@dpg-d30a7m56ubrc73emkca0-a.oregon-postgres.render.com/bloglist_wuyv --tuples-only --no-align"
$PSQL -c "SELECT title, author, url, likes FROM blogs ORDER BY title;" | while IFS="|" read -r TITLE AUTHOR URL LIKES
    do
      echo "$TITLE: $AUTHOR $URL, $LIKES likes"
    done