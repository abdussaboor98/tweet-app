package com.tweetapp.util;

import java.util.ArrayList;
import java.util.List;

import com.tweetapp.entity.TweetEntity;
import com.tweetapp.model.Comment;
import com.tweetapp.model.Tweet;

import org.springframework.beans.BeanUtils;

public class ModelEntityMappingUtil {

    /**
     * Maps the {@link TweetEntity} to {@link Tweet}. Also converts the
     * createdDateTime in them from Zoned to Local
     */
    public static void mapTweetEntityToModel(TweetEntity entity, Tweet model) {
        if (model != null && entity != null) {
            BeanUtils.copyProperties(entity, model);
            List<Comment> comments = new ArrayList<>();
            entity.getComments().forEach(commentEntity -> {
                Comment comment = new Comment();
                BeanUtils.copyProperties(commentEntity, comment);
                comment.setCreatedDateTime(DateTimeUtil.localToZonedDateTimeAtUTC(commentEntity.getCreatedDateTime()));
                comments.add(comment);
            });
            model.setComments(comments);
            model.setCreatedDateTime(DateTimeUtil.localToZonedDateTimeAtUTC(entity.getCreatedDateTime()));
        }
    }

    private ModelEntityMappingUtil() {

    }
}
