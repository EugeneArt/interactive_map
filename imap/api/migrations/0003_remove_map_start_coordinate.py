# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-16 07:59
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20171116_0719'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='map',
            name='start_coordinate',
        ),
    ]
