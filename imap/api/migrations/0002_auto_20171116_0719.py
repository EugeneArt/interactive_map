# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-16 07:19
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='map',
            name='start_coordinate',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Coordinate'),
        ),
        migrations.AlterField(
            model_name='mapimage',
            name='image',
            field=django_resized.forms.ResizedImageField(crop=None, force_format=None, keep_meta=True, quality=75, size=[1080, 608], upload_to='maps'),
        ),
    ]
